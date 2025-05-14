// Common types
export interface SanityAsset {
	_ref: string;
	_type: "reference";
}

export interface SanityImage {
	_type: "image";
	asset: SanityAsset;
	alt?: string;
	caption?: string;
}

export interface SanityButton {
	_key: string;
	_type: "button";
	label: string;
	url: string;
	variant?: "default" | "outline" | "secondary" | "link";
}

// Code type interface (for the new code input format)
export interface SanityCodeInput {
	_type: "code";
	code: string;
	language?: string;
	filename?: string;
}

// Code Block type (used within Portable Text)
export interface SanityCodeBlock {
	_type: "codeBlock";
	_key: string;
	title?: string;
	code: SanityCodeInput;
	highlightLines?: string;
	showLineNumbers?: boolean;
	caption?: string;
}

// Hero section types
interface HeroMedia {
	type: "image" | "video" | "placeholder";
	image?: SanityImage;
	video?: {
		url: string;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean;
	};
	additionalImages?: SanityImage[];
}

export interface HeroButtonType {
	_key?: string;
	label: string;
	url: string;
	variant?: "default" | "secondary" | "outline" | "ghost" | "link";
	icon?:
		| "phone"
		| "arrowRight"
		| "plus"
		| "check"
		| "heart"
		| "star"
		| "search"
		| "settings"
		| "mail"
		| "calendar";
}

export interface SanityHeroSection {
	_key: string;
	_type: "heroSection";
	variant: "buttonBanner" | "badgeBanner" | "gridGallery";
	heading: string;
	subheading?: string;
	bannerButton?: Omit<HeroButtonType, "variant" | "icon">;
	badgeText?: string;
	buttons?: HeroButtonType[];
	media?: HeroMedia;
}

// Header types
export interface SanityHeaderButton {
	_key: string;
	label: string;
	url: string;
	variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export interface SanityHeaderSubItem {
	_key: string;
	title: string;
	href: string;
}

export interface SanityNavigationItem {
	_key: string;
	title: string;
	href?: string;
	description?: string;
	items?: SanityHeaderSubItem[];
}

export interface SanityHeader {
	_id: string;
	_type: "header";
	variant?: "default" | "centered" | "minimal" | "transparent";
	title: string;
	logo?: SanityImage;
	navigationItems: SanityNavigationItem[];
	ctaButtons?: SanityHeaderButton[];
	dropdownCTALabel?: string;
	dropdownCTAUrl?: string;
}

// Footer types
export interface SanityLegalLink {
	_key: string;
	title: string;
	url: string;
}

export interface SanityFooter {
	_id: string;
	_type: "footer";
	title: string;
	logo?: SanityImage;
	description?: string;
	address?: string[];
	legalLinks?: SanityLegalLink[];
	navigationItems: SanityNavigationItem[];
	variant?: "simple" | "minimal" | "tiny";
}

// Section interfaces
export interface SanityCTAButton {
	_key: string;
	label: string;
	url: string;
	variant?: "default" | "secondary" | "outline" | "ghost" | "link";
	icon?: "none" | "arrowRight" | "phone" | "plus";
}

export interface SanityCTASection {
	_key: string;
	_type: "ctaSection";
	variant?: "default" | "highlight" | "minimal" | "full";
	badgeText?: string;
	heading: string;
	subheading?: string;
	buttons: SanityCTAButton[];
}

export interface SanityFeature {
	_key: string;
	title: string;
	description?: string;
	image?: SanityImage;
	icon?:
		| "user"
		| "settings"
		| "lock"
		| "star"
		| "heart"
		| "barChart"
		| "dollar"
		| "calendar"
		| "clock"
		| "mail";
	highlighted?: boolean;
}

export interface SanityFeatureSection {
	_key: string;
	_type: "featureSection";
	variant?:
		| "default"
		| "withImage"
		| "leftImage"
		| "rightImage"
		| "imageCards"
		| "masonryGrid"
		| "bigMasonryGrid"
		| "carouselFeature"
		| "slidingComparison";
	badgeText?: string;
	heading: string;
	subheading?: string;
	features: SanityFeature[];
	image?: SanityImage;
	comparisonImage?: SanityImage;
}

// Cases section types
export interface SanityCase {
	_key: string;
	name?: string;
	logo?: SanityImage;
	url?: string;
}

export interface SanityCasesSection {
	_key: string;
	_type: "casesSection";
	variant: "logoCarousel" | "compactSlider";
	heading: string;
	subheading?: string;
	cases?: SanityCase[];
}

// Testimonials section types
export interface SanityTestimonial {
	_key: string;
	title: string;
	content: string;
	author: string;
	role?: string;
	avatar?: SanityImage;
}

export interface SanityTestimonialsSection {
	_key: string;
	_type: "testimonialsSection";
	variant: "carousel" | "grid" | "masonry-grid";
	heading: string;
	subheading?: string;
	testimonials?: SanityTestimonial[];
}

// Pricing section types
export interface SanityPricingFeature {
	_key: string;
	title: string;
	description?: string;
}

export interface SanityPricingPlan {
	_key: string;
	title: string;
	description?: string;
	highlighted?: boolean;
	price: string;
	billingPeriod?: string;
	features: SanityPricingFeature[];
	buttonText: string;
	buttonUrl: string;
	buttonIcon?: "arrowRight" | "phone" | "plus";
	buttonVariant?: "default" | "outline" | "secondary";
}

export interface SanityPricingSection {
	_key: string;
	_type: "pricingSection";
	badgeText?: string;
	heading: string;
	subheading?: string;
	plans: SanityPricingPlan[];
}

// Compare Features section types
export interface SanityCompareFeature {
	_id: string;
	_type: "compareFeature";
	title: string;
	description?: string;
}

export interface SanityFeatureValue {
	_key?: string;
	featureRef: SanityCompareFeature;
	value: "true" | "false" | "custom";
	customText?: string;
}

export interface SanityComparePlan {
	_key: string;
	title: string;
	description?: string;
	price: string;
	billingPeriod?: string;
	highlighted?: boolean;
	featureValues?: SanityFeatureValue[];
	buttonText: string;
	buttonUrl: string;
	buttonIcon?: "arrowRight" | "phone" | "plus";
	buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

export interface SanityCompareFeaturesSection {
	_key: string;
	_type: "compareFeaturesSection";
	badgeText?: string;
	heading: string;
	subheading?: string;
	features: SanityCompareFeature[];
	plans: SanityComparePlan[];
	footnote?: string;
}

// Stats section types
export interface SanityStat {
	_key: string;
	value: string;
	label: string;
	trendDirection?: "up" | "down" | "none";
	trendValue?: string;
	color?: "primary" | "success" | "warning" | "destructive" | "muted";
}

export interface SanityStatsSection {
	_key: string;
	_type: "statsSection";
	variant?: "grid" | "withContent";
	heading?: string;
	subheading?: string;
	badgeText?: string;
	contentHeading?: string;
	contentText?: string;
	stats: SanityStat[];
}

// FAQ section types
export interface SanityFAQItem {
	_key: string;
	question: string;
	answer: string;
}

export interface SanityFAQSection {
	_key: string;
	_type: "faqSection";
	variant?: "sideBySide" | "centered";
	badgeText?: string;
	heading: string;
	subheading?: string;
	buttonText?: string;
	buttonUrl?: string;
	buttonIcon?: "none" | "phone" | "arrowRight" | "plus" | "check";
	faqItems: SanityFAQItem[];
}

// Blog types
export interface SanityAuthorSocialLink {
	_key: string;
	platform:
		| "twitter"
		| "linkedin"
		| "github"
		| "instagram"
		| "website"
		| "youtube";
	url: string;
	username?: string;
}

export interface SanityAuthor {
	_id: string;
	_type: "author";
	name: string;
	slug: {
		current: string;
	};
	avatar?: SanityImage;
	role?: string;
	bio?: string;
	fullBio?: PortableTextContent;
	socialLinks?: SanityAuthorSocialLink[];
	email?: string;
	featuredImage?: SanityImage;
}

export interface SanityCategory {
	_id: string;
	_type: "category";
	title: string;
	slug: {
		current: string;
	};
	description?: string;
}

export interface PortableTextBlock {
	_type: "block";
	_key: string;
	children: {
		_key: string;
		_type: string;
		text?: string;
		marks?: string[];
	}[];
	markDefs?: {
		_key: string;
		_type: string;
		href?: string;
		blank?: boolean;
	}[];
	style?: string;
	listItem?: string;
	level?: number;
}

export interface PortableTextImage {
	_type: "image";
	_key: string;
	asset: SanityAsset;
	alt?: string;
	caption?: string;
}

export type PortableTextContent = (
	| PortableTextBlock
	| PortableTextImage
	| SanityCodeBlock
)[];

export interface SanityBlogPost {
	_id: string;
	_type: "blogPost";
	title: string;
	slug: {
		current: string;
	};
	publishedAt: string;
	excerpt?: string;
	authors: SanityAsset[] & { _id?: string }[]; // Changed from author to authors (array)
	mainImage?: SanityImage;
	categories?: (SanityAsset & { _id?: string })[];
	body?: PortableTextContent;
	featured?: string; // Changed from boolean to string to match schema
}

export interface SanityBlogSection {
	_key: string;
	_type: "blogSection";
	heading: string;
	subheading?: string;
	postsToShow?: number;
	showFeaturedPostLarge?: string;
	featuredPostsOnly?: string;    
	variant?: "default" | "grid";
	viewAllButton?: string;        
	viewAllUrl?: string;
	viewAllButtonText?: string;
}

// Contact section types
export interface SanityContactFeature {
	_key: string;
	title: string;
	description?: string;
}

export interface SanityContactSection {
	_key: string;
	_type: "contactSection";
	badgeText: string;
	heading: string;
	description?: string;
	features: SanityContactFeature[];
	formTitle?: string;
	formFields?: {
		showDate?: boolean;
		showFirstName?: boolean;
		showLastName?: boolean;
		showFileUpload?: boolean;
		fileUploadLabel?: string;
	};
	buttonText: string;
	buttonIcon?: "arrowRight" | "phone" | "none";
}

// Newsletter section types
export interface SanityNewsletterSection {
	_key: string;
	_type: "newsletterSection";
	variant?: "default" | "highlight" | "minimal" | "full";
	badgeText?: string;
	heading: string;
	subheading?: string;
	inputPlaceholder?: string;
	buttonText: string;
	buttonIcon?: "none" | "arrowRight" | "plus" | "mail";
	successMessage?: string;
	privacyText?: string;
}

// Union type for all section types
export type SanitySection =
	| SanityHeroSection
	| SanityCTASection
	| SanityFeatureSection
	| SanityCasesSection
	| SanityTestimonialsSection
	| SanityPricingSection
	| SanityCompareFeaturesSection
	| SanityStatsSection
	| SanityFAQSection
	| SanityBlogSection
	| SanityContactSection
	| SanityNewsletterSection;

// Page schema
export interface SanityPage {
	_id: string;
	_type: "page";
	title: string;
	slug: {
		current: string;
	};
	description?: string;
	ogImage?: SanityImage;
	pageBuilder: SanitySection[];
}

// Blog Page Configuration Document
export interface SanityBlogPage {
	_id: string;
	_type: "blogPage";
	title: string;
	description?: string;
	layout?: "grid" | "featured" | "compact";
	postsPerPage?: number;
	featuredPostsCount?: number;
	showOnlyFeaturedPosts?: string; // Changed to string to match schema
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
}

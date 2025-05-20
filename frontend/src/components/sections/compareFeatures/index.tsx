"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import type { CompareFeaturesSection } from "@/sanity/types";
import Default from "./default";

export interface CompareFeatureWithTitle {
  _id: string;
  _key: string;
  title: string;
}

// Main router component
export default function CompareFeaturesRouter(props: CompareFeaturesSection) {
  const [features, setFeatures] = useState<CompareFeatureWithTitle[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch the feature titles from Sanity - we receive references to features in the props
  useEffect(() => {
    if (!props.features || props.features.length === 0) return;
    
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        
        // Get all feature IDs 
        const featureIds = props.features?.map((feature) => feature._ref) || [];
        
        // Fetch the feature details from Sanity
        const query = `*[_type == "compareFeature" && _id in $ids]{
          _id,
          title
        }`;
        
        const results = await client.fetch<Array<{ _id: string; title: string }>>(query, { ids: featureIds });
        
        // Map the results to include the _key from the original features
        const featuresWithKeys = results.map((feature) => {
          const original = props.features?.find(f => f._ref === feature._id);
          return {
            ...feature,
            _key: original?._key || feature._id
          };
        });
        
        setFeatures(featuresWithKeys);
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeatures();
  }, [props.features]);

  // Currently there's only one variant, but this structure allows for adding more in the future
  return <Default {...props} features={features} isLoading={loading} />;
}

// Re-export the main component types for convenience
export type { CompareFeaturesSection };

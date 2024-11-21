"use client";

import React, { useState, useEffect } from "react";

interface SyncClientAndServerComponentsProps {
  children: React.ReactNode;
}

const SyncClientAndServerComponents: React.FC<
  SyncClientAndServerComponentsProps
> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default SyncClientAndServerComponents;

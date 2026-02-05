import { useEffect } from "react";
export const useBootstrapTooltips = () => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(
      (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
    );
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);
};
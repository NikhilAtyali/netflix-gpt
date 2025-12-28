import { useRef, useEffect } from 'react';

/**
 * Hook to count component re-renders (for debugging)
 * Usage: const renderCount = useRenderCount('ComponentName');
 */
export const useRenderCount = (componentName) => {
  const renders = useRef(0);

  useEffect(() => {
    renders.current += 1;
    console.log(
      `🔄 ${componentName} render count:`,
      renders.current,
      '| Time:',
      new Date().toISOString().split('T')[1]
    );
  });

  return renders.current;
};

/**
 * Hook to log why component re-rendered
 * Usage: useWhyDidYouUpdate('ComponentName', props);
 */
export const useWhyDidYouUpdate = (name, props) => {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log(`[${name}] Changed props:`, changedProps);
      }
    }

    previousProps.current = props;
  });
};


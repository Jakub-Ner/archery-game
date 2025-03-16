import { Button } from '../ui/button';

export default function ButtonDemo() {
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

  return (
    <>
      <h2 className="mt-2">Button Variants</h2>
      <div>
        {variants.map((variant) => (
          <Button className="ml-1" key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </>
  );
};

import type { ComponentProps } from 'react';

export const Button = (props: ComponentProps<'button'>) => (
  <button
    className="mx-[10px] my-[5px] cursor-pointer appearance-none rounded-[4px] bg-curious-blue px-[10px] py-[5px] text-[14px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-curious-blue enabled:hover:bg-curious-blue-dark enabled:active:bg-curious-blue-dark disabled:cursor-default disabled:bg-silver-chalice"
    {...props}
  />
);

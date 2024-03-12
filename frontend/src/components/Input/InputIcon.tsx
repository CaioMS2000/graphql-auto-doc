import { PropsWithChildren, HTMLProps } from 'react';

interface InputIconProps extends PropsWithChildren, HTMLProps<HTMLElement> {
    element: (props: any) => JSX.Element
}

export default function InputIcon({element:Element, ...rest}:InputIconProps){

  return(
      <>
      <Element {...rest} />
      </>
  )
}
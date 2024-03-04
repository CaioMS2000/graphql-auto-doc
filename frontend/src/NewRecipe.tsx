import { PropsWithChildren, HTMLProps } from 'react';
import Header from './components/Header';

interface NewRecipeProps extends PropsWithChildren, HTMLProps<HTMLElement> {
}

export default function NewRecipe({...rest}:NewRecipeProps){

  return(
      <>
      <Header />
      </>
  )
}
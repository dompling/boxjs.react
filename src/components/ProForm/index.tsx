import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

const ProFrom: React.FC<
  {
    form?: UseFormReturn;
    onSubmit: SubmitHandler<any>;
    children: React.ReactNode;
  } & React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
> = ({ onSubmit, form, ...props }) => {
  return (
    <form
      onSubmit={
        form?.handleSubmit(onSubmit) ||
        ((event) => {
          event.preventDefault();
          onSubmit(undefined);
        })
      }
      {...props}
    >
      {props.children}
    </form>
  );
};

export default ProFrom;

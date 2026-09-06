'use client';
import { memo, useState, useImperativeHandle, forwardRef, type ReactNode } from 'react';
import { useForm, Controller, type ControllerProps, type UseFormReturn } from 'react-hook-form';
import { Input, Button, Form as HeroForm, type InputProps } from '@heroui/react';
import { cn } from '@/utils';

export type FormItemType = InputProps & {
  name: string;
  rules?: ControllerProps['rules'];
  controllerProps?: Partial<ControllerProps>;
};

export interface FormRef {
  getFormRef: () => UseFormReturn;
}

export interface FormProps {
  className?: string;
  defaultValues?: Record<string, any>;
  formItems: FormItemType[];
  submitBtn: ReactNode;
  submitBtnProps?: Record<string, any>;
  renderSubmitBtn?: (currentBtn: ReactNode) => ReactNode;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
}

export const Form = memo(
  forwardRef<FormRef, FormProps>((props, ref) => {
    const {
      className,
      formItems,
      defaultValues,
      submitBtn,
      submitBtnProps,
      renderSubmitBtn,
      onSubmit,
    } = props;
    const [submitLoading, setSubmitLoading] = useState(false);
    const formRef = useForm({ defaultValues, shouldUnregister: true });
    const { handleSubmit, control } = formRef;

    const awaitSubmit = async values => {
      setSubmitLoading(true);
      try {
        await onSubmit?.(values);
      } catch (e) { }
      setSubmitLoading(false);
    };

    const renderBtn = () => {
      const { className, ...otherProps } = submitBtnProps || {};

      return (
        <Button
          isLoading={submitLoading}
          color='primary'
          type='submit'
          className={cn('w-full rounded-full mt-[30px] h-[52px] font-bold text-[16px]', className)}
          {...otherProps}
        >
          <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
            <div className='h-full flex items-center'>{submitBtn}</div>
            <div className='h-full flex items-center'>{submitBtn}</div>
          </div>
        </Button>
      );
    };

    useImperativeHandle(ref, () => ({
      getFormRef: () => formRef,
    }));

    return (
      <HeroForm
        className={cn('w-full flex flex-col mt-[30px]', className)}
        onSubmit={handleSubmit(awaitSubmit)}
      >
        {formItems?.map(item => {
          const { name, rules, label, placeholder, controllerProps, classNames, ...otherProps } =
            item;

          return (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={rules}
              render={({ field, fieldState }) => (
                <Input
                  validationBehavior='aria'
                  labelPlacement='outside'
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label={label}
                  placeholder={placeholder || (label as string)}
                  classNames={{
                    label: 'text-[20px] pb-[18px]',
                    inputWrapper: 'h-[60px] bg-[#17181C] border border-[rgba(255,255,255,0.1)]',
                    base: 'h-[105px]',
                    input: '!text-[#fff]',
                    ...classNames,
                  }}
                  {...field}
                  {...otherProps}
                />
              )}
              {...controllerProps}
            />
          );
        })}

        {renderSubmitBtn ? renderSubmitBtn(renderBtn()) : renderBtn()}
      </HeroForm>
    );
  }),
);
import { memo } from 'react';
import { addToast } from '@heroui/react';
import { Form, Modal } from '@/components/common';
import { request, aesEncryptGCM } from '@/utils';

export interface AccountSettingProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

export const AccountSetting = memo((props: AccountSettingProps) => {
  const { visible, onVisibleChange } = props;

  const handleSaveNewPassword = async values => {
    const res = await request.post('/api/front/update/user/info', {
      password: await aesEncryptGCM(values.password),
    });

    addToast({ title: res?.text, color: 'success' });
    onVisibleChange(false);
  };

  return (
    <Modal
      title='Account Settings'
      cancelBtnProps={{ className: 'hidden' }}
      okBtnProps={{ className: 'hidden' }}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      <Form
        submitBtn='Save Changes'
        submitBtnProps={{ className: 'mt-0' }}
        onSubmit={handleSaveNewPassword}
        formItems={[
          {
            name: 'password',
            label: 'Password',
            placeholder: 'Enter new password',
            className: '!mt-[30px]',
            rules: {
              required: true,
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long.',
              },
            },
          },
          {
            name: 'confirmPassword',
            label: 'Confirm new password',
            placeholder: 'Confirm new password',
            rules: {
              required: true,
              validate: (_, values) => {
                const { password, confirmPassword } = values;
                return password === confirmPassword ? true : 'The two passwords must match.';
              },
            },
          },
        ]}
      />
    </Modal>
  );
});
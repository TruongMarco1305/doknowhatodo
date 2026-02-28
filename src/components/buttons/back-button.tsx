import { Button } from "@douyinfe/semi-ui-19";
import { IconArrowLeft } from "@douyinfe/semi-icons";
import { useNavigate, useRouter } from "@tanstack/react-router";

type BackButtonProps = {
  to?: string;
};

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();
  const { history } = useRouter();
  return (
    <Button
      onClick={() => {
        if (to) {
          navigate({ to });
        } else {
          history.go(-1);
        }
      }}
      icon={<IconArrowLeft />}
      type="tertiary"
      className='w-fit'
      theme="borderless"
    >Return</Button>
  );
}

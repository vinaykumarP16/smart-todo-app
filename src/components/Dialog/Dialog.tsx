import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";


interface CommonDialogProps {
  title: string;
  content: React.ReactNode;
  onAgree?: () => void;
  onDisagree?: () => void;
  agreeText?: string;
  disagreeText?: string;
  children?: React.ReactNode; // Trigger button (optional)
}
 const CommonDialog: React.FC<CommonDialogProps> = ({
  title,
  content,
  onAgree,
  onDisagree,
  agreeText = "Confirm",
  disagreeText = "Cancel",
  children,
}) => {
  return (
    <Dialog>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>{title}</DialogTitle>
        {content}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onDisagree}>
              {disagreeText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onAgree}>{agreeText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children?: ReactNode;
  parentElement?: HTMLElement;
}

const PortalComponent: React.FC<PortalProps> = ({ children, parentElement }: PortalProps) => {
  const container = parentElement ?? document.querySelector('.pk-office-a-root') ?? document.body;

  return ReactDOM.createPortal(children, container);
};

export default PortalComponent;

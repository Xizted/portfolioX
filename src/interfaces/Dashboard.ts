export interface ViewToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

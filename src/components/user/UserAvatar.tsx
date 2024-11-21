import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  user: string | null;
};

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Avatar>
        <AvatarImage
          className="object-cover"
          src="https://images.unsplash.com/photo-1729632210385-3d48ea8c84f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <AvatarFallback>HI</AvatarFallback>
      </Avatar>

      <span className="capitalize font-semibold text-lg">{user}</span>
    </div>
  );
};

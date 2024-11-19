"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { Input } from "../ui/input";

type PasswordInputProps = {
  field: FieldValues;
};

const PasswordInput = ({ field }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder="Input password"
        type={showPassword ? "text" : "password"}
        {...field}
      />
      <div
        className="absolute -translate-y-1/2 right-2 top-1/2 hover:cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeClosed color="black" size={20} />
        ) : (
          <Eye color="black" size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

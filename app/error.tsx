"use client";

type Props = {
  error: Error;
};

export default function ErrorPage({ error }: Props) {
  <div className="flex flex-col gap-2">{error.message}</div>;
}

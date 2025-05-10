"use client";

import NotificationMessage from "@/components/NotificationMessage";

type Props = {
  error: Error;
  reset: () => void;
};

const MeasurementError = ({ error, reset }: Props) => {
  if (error instanceof Error) {
    return (
      <NotificationMessage
        title={error.message || "Failed to get your measurements"}
        subTitle={error?.message}
      />
    );
  }
  console.error("An unknown error occurred");
  return <NotificationMessage title="Sorry, An unknown error occurred" />;
};

export default MeasurementError;

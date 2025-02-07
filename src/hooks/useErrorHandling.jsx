import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrorHandling = (messageError) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (messageError) {
      setHasError(true);
      toast.error(messageError.message);
    }
  }, [messageError]);

  return { hasError };
};

export default useErrorHandling;

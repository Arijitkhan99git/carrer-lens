import { useMutation } from "@tanstack/react-query";
import { fetchMatchedJobs } from "../services/matchedJob-services";

export function useFetchMatchedJobs() {
  return useMutation({
    mutationFn: fetchMatchedJobs,
    onSuccess(response) {
      console.log(response.total_matches);
    },
    //      onError: (error: AxiosError<ErrorObject>) => {
    //   toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    // },
  });
}

import { NextPage } from "next";
import { Button } from "ui";
import { trpc } from "./_app";

const IndexPage: NextPage = () => {
  const { data, isLoading, isError } = trpc.useQuery([
    "getUserById",
    "hogehoge",
  ]);
  return (
    <div>
      {data?.id}
      <Button />
    </div>
  );
};

export default IndexPage;

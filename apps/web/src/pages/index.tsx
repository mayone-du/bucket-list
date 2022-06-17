import { NextPage } from "next";
import { z } from "zod";
// import { Button } from "ui";
import { trpc } from "pages/_app";
import { TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { pagePath } from "lib/$path";

// type FieldValues = {
//   name: string,
//   email: string,
//   age: number
// }

// TODO: apiと同じバリデーションを適用するため、共通化する。
// また、useFormのジェネリクスに渡す型をいい感じにしたい。（initialValuesの補完がきかないから）

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 to create an account" }),
});

const IndexPage: NextPage = () => {
  const { data, isLoading, isError } = trpc.useQuery([
    "getUserById",
    "inputttttttt",
  ]);
  const { getInputProps } = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      age: null,
    },
  });

  return (
    <div>
      <TextInput {...getInputProps("name")} />
      {data}
      {/* <Button /> */}
      <div>
        <Link href={pagePath}>link</Link>
      </div>
    </div>
  );
};

export default IndexPage;

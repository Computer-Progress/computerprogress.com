import React from "react";
import Link from "next/link";

import { Wrapper, ImageWrapper, Separator, Image } from "./styles";


const Task = ({ item }) => {
  return (
    <Link href={`/tasks/${item.identifier}`}>
      <Wrapper>
        <ImageWrapper>
          <Image src={item.image} />
          <h3>{item.name}</h3>
        </ImageWrapper>
        <Separator />
        <p>Number of benchmarks: {item.number_of_benchmarks}</p>
      </Wrapper>
    </Link>
  );
}

export default Task;

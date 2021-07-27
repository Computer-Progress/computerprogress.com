import Link from "next/link";
import React from "react";
import { Wrapper, SearchWrapper, Separator, Image, Input, Header, SearchIcon, Selector } from "./styles";
import { MenuItem } from '@material-ui/core'
import Submission from "./Submission";

export default function ({ papers }) {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Wrapper>
      <Header>
          {/* <Image src={item.image} /> */}
        <SearchIcon />
        <Input label="Search" />
        <Selector
          value={age}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
        >
          <MenuItem value={10}>Select</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Selector>
      </Header>
      <Separator blue />
      {papers.map((paper, index) => (
        <>
          <Submission paper={paper} />
          {index !== papers.length - 1 ? (
            <Separator />
          ) : null}
        </>
      ))}
    </Wrapper>
  );
}

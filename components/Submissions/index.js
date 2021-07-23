import Link from "next/link";
import React from "react";
import { Wrapper, SearchWrapper, Separator, Image, Input, Header } from "./styles";
import { Select, MenuItem } from '@material-ui/core'
import Submission from "./Submission";

export default function ({ papers }) {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Wrapper>
      <Header>
        <SearchWrapper>
          {/* <Image src={item.image} /> */}
          <Input label="Search" />
        </SearchWrapper>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          style={{ minWidth: 150 }}
        >
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
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

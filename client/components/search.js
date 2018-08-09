import React from 'react'
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function Search(props) {
  return (
    <form>
      <InputGroup>
        <Input
          type="text"
          placeholder="Summoner name"
          onInput={props.input}
        />
        <InputGroupAddon addonType="append">
          <Button
            onClick={props.click}
            type="button"
          >
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

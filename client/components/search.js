import React from 'react'
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function Search(props) {
  return (
    <form>
      <InputGroup>
        <Input
          type="text"
          placeholder="Summoner"
          onInput={props.input}
        />
        <InputGroupAddon addonType="append">
          <Button
            outline color="secondary"
            onClick={props.click}
          >
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

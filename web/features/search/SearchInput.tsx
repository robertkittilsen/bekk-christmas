import {
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  IconButton,
  InputProps,
} from "@chakra-ui/react";
import { SearchIcon } from "./SearchIcon";
import { CloseIcon } from "./CloseIcon";
import { SearchBarIcon } from "./SearchBarIcon";

type Props = {
  onClose: () => void;
  value: string;
} & InputProps;

export const SearchInput = (props: Props) => {
  return (
    <InputGroup ml={-2}>
      {props.value === "" ? (
        <InputRightElement pointerEvents="none" mr={-4}>
          <SearchIcon mr={2} />
          <SearchBarIcon />
        </InputRightElement>
      ) : (
        <InputRightElement mr={-4}>
          <IconButton
            aria-label="Close"
            icon={<Icon as={CloseIcon} />}
            variant={"unstyled"}
            onClick={props.onClose}
            alignItems={"center"}
            mr={1}
          />
          <SearchBarIcon mr={2} />
        </InputRightElement>
      )}
      <Input
        color="white"
        border="0px"
        borderBottom="4px"
        borderRadius="0px"
        fontSize={32}
        fontFamily={"Newzald"}
        variant={"unstyled"}
        type="search"
        css={{
          "::-webkit-search-cancel-button, ::-webkit-search-decoration": {
            WebkitAppearance: "none",
            appearance: "none",
          },
        }}
        {...props}
      />
    </InputGroup>
  );
};
/*
{
  '[type="search"]::-webkit-search-cancel-button': {
    "-webkit-appearance": "none",
    appearance: "none",
  },
  '[type="search"]::-webkit-search-decoration': {
    "-webkit-appearance": "none",
    appearance: "none",
  },
}
*/

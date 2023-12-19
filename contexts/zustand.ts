import {create} from 'zustand';

type AddressType = {
	zipCode: string;
	address: string;
	city: string;
	state: string;
	fullName: string;
};

type State = {
	address: AddressType[];
	setAddress: (address: AddressType) => void;
};

export const useAddress = create<State>(set => ({
  address: [],

  setAddress: (info) => {
    set(({address: [info]}));
  }

}));

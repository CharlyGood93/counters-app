import React from 'react';
import { shallow } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";

describe('Testing <AppRouter />', () => {
    test('Should show the <AppRouter /> component correctly', () => {
        const wrapper = shallow(<AppRouter />);
        expect(wrapper).toMatchSnapshot();
    });
});

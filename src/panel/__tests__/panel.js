import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../';

jest.mock('../../utils/config');

describe('Panel', () => {
  it('Panel renders correctly, dev true', () => {
    const storybook = {
      getQueryParam: () => 'true',
      setQueryParams: () => {},
    };

    const tree = renderer
      .create(<Panel storybook={storybook} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Panel renders correctly, dev false', () => {
    const storybook = {
      getQueryParam: () => 'false',
      setQueryParams: () => {},
    };

    const tree = renderer
      .create(<Panel storybook={storybook} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Panel renders correctly, dev false, versions', async () => {
    const storybook = {
      getQueryParam: () => 'false',
      setQueryParams: () => {},
    };

    expect.assertions(1);
    const wrapper = await shallow(<Panel storybook={storybook} />);
    expect(wrapper.find('a').length).toBe(4);
  });
});

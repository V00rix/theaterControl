import { TheaterControlPage } from './app.po';

describe('theater-control App', () => {
  let page: TheaterControlPage;

  beforeEach(() => {
    page = new TheaterControlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

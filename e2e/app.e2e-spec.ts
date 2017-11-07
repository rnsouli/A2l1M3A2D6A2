import { AlMadaPage } from './app.po';

describe('al-mada App', function() {
  let page: AlMadaPage;

  beforeEach(() => {
    page = new AlMadaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

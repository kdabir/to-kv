const toKvConverter = require("../index")

describe("on conflict strategy", () => {

  const arrOfObjects = [
    {key: 'tag', value: 'cool', extra: 'info about a'},
    {key: 'tag', value: 'stuff', extra: 'info about b'},
    {key: 'from', value: 'sender', extra: 'info about sender'},
    {key: 'to', value: 'receiver', extra: 'info about receiver'}
  ];

  it("should save last occurrence when using keepLast strategy", () => {
    const convert = toKvConverter({onConflict: 'keepLast'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'stuff', from: 'sender', to: 'receiver'})
  });

  it("should save first occurrence when using keepFirst strategy", () => {
    const convert = toKvConverter({onConflict: 'keepFirst'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'cool', from: 'sender', to: 'receiver'})
  });

  it("should save all occurrence when using keepAll strategy", () => {
    const convert = toKvConverter({onConflict: 'keepAll'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: ['cool', 'stuff'], from: ['sender'], to: ['receiver']})
  });

  it("should use keepLast as default strategy", () => {
    const convert = toKvConverter();
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'stuff', from: 'sender', to: 'receiver'})
  });

});
describe("missing values", () => {

  const arrOfObjects = [
    {key: 'tag', value: undefined, extra: 'info about a'},
    {key: 'tag', value: 'stuff', extra: 'info about b'},
    {key: 'from', value: 'sender', extra: 'info about sender'},
    {key: 'from',                 extra: 'info about sender'},
    {key: 'to', value: 'receiver', extra: 'info about receiver'},
    {key: 'to', value: null, extra: 'info about receiver'}
  ];

  it("should save last occurrence when using keepLast strategy", () => {
    const convert = toKvConverter({onConflict: 'keepLast'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'stuff', from: 'sender', to: null})
  });

  it("should save first occurrence when using keepFirst strategy", () => {
    const convert = toKvConverter({onConflict: 'keepFirst'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'cool', from: 'sender', to: 'receiver'})
  });

  it("should save all occurrence when using keepAll strategy", () => {
    const convert = toKvConverter({onConflict: 'keepAll'});
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: ['cool', 'stuff'], from: ['sender'], to: ['receiver']})
  });

  it("should use keepLast as default strategy", () => {
    const convert = toKvConverter();
    const obj = convert(arrOfObjects);

    expect(obj).toEqual({tag: 'stuff', from: 'sender', to: 'receiver'})
  });

});

describe('option to change key and value names', () => {

  const superheros = [
    {name: 'Superman', city: 'Metropolis'},
    {name: 'Batman', city: 'Gotham'},
    {name: 'Spiderman', city: 'NYC'},
    {name: 'Captain America', city: 'unknown'}
  ];

  it('should allow changing key and value names', () => {
    const convert = toKvConverter({keyName: 'name', valueName: 'city'});
    const obj = convert(superheros);

    expect(obj).toEqual({
      'Superman': 'Metropolis',
      'Batman': 'Gotham',
      'Spiderman': 'NYC',
      'Captain America': 'unknown'
    })
  })

});

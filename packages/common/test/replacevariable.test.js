/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import ReplaceVariables from '../src/ReplaceVariables';

describe('Testing Variable replacements', () => {
  it('should be empty', () => {
    const result = ReplaceVariables('');
    expect(result).to.be.a('string');
    expect(result).to.be.empty; // eslint-disable-line
  });
  it('should be the same as the variable name without replacing', () => {
    const result = ReplaceVariables('cellid', { $cellid: 2 });
    expect(result).not.to.be.empty;
    expect(result).to.equal('cellid');
  });
  it('should not be empty', () => {
    const result = ReplaceVariables('$cellid', { $cellid: 2 });
    expect(result).not.to.be.empty;
    expect(result).to.equal('2');
  });
  it('should not be empty for variable string containing replacement', () => {
    const result = ReplaceVariables('the cellid is $cellid', { $cellid: 2 });
    expect(result).not.to.be.empty;
    expect(result).to.equal('the cellid is 2');
  });
  it('should be the same as the parameter', () => {
    const result = ReplaceVariables('the cellid is the same', { $cellid: 2 }, { $cellid: 3 });
    expect(result).not.to.be.empty;
    expect(result).to.equal('the cellid is the same');
  });
  it('it should use the variable in the tempdata for replacement', () => {
    const result = ReplaceVariables('the $cellid is the same', { $cellid: 2 }, { $cellid: 3 });
    expect(result).not.to.be.empty;
    expect(result).to.equal('the 3 is the same');
  });
  it('replace multiple variables', () => {
    const result = ReplaceVariables(
      '$the cellid $cellid is the $same as $cellid',
      { $the: 'the', $cellid: 2 },
      { $cellid: 3, $same: 'same' },
    );
    expect(result).not.to.be.empty;
    expect(result).to.equal('the cellid 3 is the same as 3');
  });
  it('should the same as the parameter if the appdata and tempdata are empty', () => {
    const result = ReplaceVariables('The $cellid is not there');
    expect(result).not.to.be.empty;
    expect(result).to.equal('The $cellid is not there');
  });
  it('should be empty for non-string parameter', () => {
    const result = ReplaceVariables({ $cellid: 5 }, { $cellid: 2 });
    expect(result).to.be.a('string');
    expect(result).to.be.empty;
  });
});

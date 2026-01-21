import { getAvatarLetter } from './getAvatarLetter';

describe('getAvatarLetter', () => {
  it.each`
    text                       | expected
    ${"Steve'"}                | ${'S'}
    ${' Steve '}               | ${'S'}
    ${' Steve.'}               | ${'S'}
    ${' Steve.Johnson'}        | ${'SJ'}
    ${'steve johnson'}         | ${'SJ'}
    ${'Steve.Johnson '}        | ${'SJ'}
    ${'.Steve.Johnson'}        | ${'SJ'}
    ${'Steve.Johnson.'}        | ${'SJ'}
    ${'.Steve.Johnson.'}       | ${'SJ'}
    ${'.Steve Johnson.'}       | ${'SJ'}
    ${' Steve-Johnson'}        | ${'SJ'}
    ${'Steve-Johnson '}        | ${'SJ'}
    ${'-Steve-Johnson'}        | ${'SJ'}
    ${'Steve-Johnson-'}        | ${'SJ'}
    ${'-Steve-Johnson-'}       | ${'SJ'}
    ${'-Steve Johnson-'}       | ${'SJ'}
    ${' Steve_Johnson'}        | ${'SJ'}
    ${'Steve_Johnson '}        | ${'SJ'}
    ${'_Steve_Johnson'}        | ${'SJ'}
    ${'Steve_Johnson_'}        | ${'SJ'}
    ${'_Steve_Johnson_'}       | ${'SJ'}
    ${'_Steve Johnson_'}       | ${'SJ'}
    ${null}                    | ${''}
    ${''}                      | ${''}
    ${'.'}                     | ${''}
    ${' '}                     | ${''}
    ${'一个很厉害的 Team'}     | ${'一T'}
    ${'一个很厉害的 部门'}     | ${'一部'}
    ${' 一个很厉害的 部门'}    | ${'一部'}
    ${' .一个很厉害的 部门'}   | ${'一部'}
    ${'steve.1Test'}           | ${'S1'}
    ${'リンクおよび Tatata'}   | ${'リT'}
    ${'リンクおよびTatata'}    | ${'リ'}
    ${'John Doe'}              | ${'JD'}
    ${'Jane'}                  | ${'J'}
    ${'A.B.'}                  | ${'AB'}
    ${'🛑A.🟢B.'}              | ${'🛑🟢'}
    ${'🛑A 🟢B.'}              | ${'🛑🟢'}
    ${'㊙declan😩zou'}         | ${'㊙'}
    ${'㊙declan😩zou'}         | ${'㊙'}
    ${'🫡declan😩zou'}          | ${'🫡'}
    ${'🇦🇬 🇦🇷'}                 | ${'🇦🇬🇦🇷'}
    ${'AAA🇦🇬 BBB🇦🇷'}           | ${'AB'}
    ${'⚽️AAA🇦🇬 B⚽️BB🇦🇷'}     | ${'⚽️B'}
    ${'❤️⚽️AAA🇦🇬 B⚽️BB🇦🇷'}   | ${'❤️B'}
    ${'👻❤️⚽️AAA🇦🇬 B⚽️BB🇦🇷'} | ${'👻B'}
  `('should get letter: $expected from $text', ({ text, expected }) => {
    const letter = getAvatarLetter(text);
    expect(letter).toEqual(expected);
  });
});

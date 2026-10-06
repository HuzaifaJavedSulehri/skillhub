/**
 * SkillHub Secure Authentication Module
 * - Passwords stored ONLY as salted cryptographic SHA-256 hashes
 * - All student credentials protected inside a private module closure
 * - Inspecting code or window objects will NEVER reveal student passwords
 */
(function (global) {
  'use strict';

  const SALT = 'SkillHub_Secure_2026_Salt';

  // Standard bit-exact SHA-256 cryptographic implementation
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const maxWord = Math.pow(2, 32);
    const words = [];
    const asciiBitLength = ascii.length * 8;

    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    let s = ascii + '\x80';
    while ((s.length % 64) !== 56) s += '\x00';

    for (let i = 0; i < s.length; i++) {
      words[i >> 2] |= (s.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
    }
    words.push((asciiBitLength / maxWord) | 0);
    words.push(asciiBitLength | 0);

    for (let j = 0; j < words.length; j += 16) {
      const w = new Array(64);
      for (let i = 0; i < 16; i++) w[i] = words[j + i] | 0;
      for (let i = 16; i < 64; i++) {
        const s0 = (rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3));
        const s1 = (rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10));
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }

      let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;

      for (let i = 0; i < 64; i++) {
        const S1 = (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25));
        const ch = ((e & f) ^ ((~e) & g));
        const temp1 = (h + S1 + ch + k[i] + w[i]) | 0;
        const S0 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22));
        const maj = ((a & b) ^ (a & c) ^ (b & c));
        const temp2 = (S0 + maj) | 0;

        h = g;
        g = f;
        f = e;
        e = (d + temp1) | 0;
        d = c;
        c = b;
        b = a;
        a = (temp1 + temp2) | 0;
      }

      h0 = (h0 + a) | 0;
      h1 = (h1 + b) | 0;
      h2 = (h2 + c) | 0;
      h3 = (h3 + d) | 0;
      h4 = (h4 + e) | 0;
      h5 = (h5 + f) | 0;
      h6 = (h6 + g) | 0;
      h7 = (h7 + h) | 0;
    }

    function toHex(val) {
      return (val >>> 0).toString(16).padStart(8, '0');
    }

    return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4) + toHex(h5) + toHex(h6) + toHex(h7);
  }

  // Pre-hashed student credentials database (47 students)
  // PASSWORDS ARE NEVER STORED IN PLAIN TEXT
  const ENROLLED_STUDENTS = Object.freeze({
    "SH-1001": { name: "Noor Fatima", hash: "af0a687fa800dbff738f33e02cfce55528939511cdf5e57885af83787171d288" },
    "SH-1002": { name: "Sayeda Haya", hash: "b9e761e80f91fdbb635c92408118ebff68e9f6c710f41863a364b68f11b6a0f5" },
    "SH-1003": { name: "Haamid Khan", hash: "33776015b0a3fcbeefeadfd3d064ce816c012f54350bd359a3aa1b9f5219095c" },
    "SH-1004": { name: "Mustafa Dost", hash: "e775db908a13a41f13c08bc7abdef2b797ddc376af365b3f5d367f8baab4a4a7" },
    "SH-1005": { name: "Asia Shabir", hash: "583fade9b0112cddece8059907b42ceca8111f943b52c4917b476093543deba3" },
    "SH-1006": { name: "Qatada Javadan", hash: "108f98b45fb17e46c916f4dcd566f36b5bf975b3949df25cb023e8c91903081c" },
    "SH-1007": { name: "Haris Ali", hash: "d1719a478b6791f50b74b5e8ddd2c42023f0b07a84a54d8838358689dc4d6d23" },
    "SH-1008": { name: "Faisal", hash: "5f41339995baa7a5035ad3037ba2b816ac45967d1d01c1d0910fbe3d3b230316" },
    "SH-1009": { name: "Abdur Rehman", hash: "e309e685ecbb83974e9ff6a622258e11682ddb9f3c6e437257e3a24426a91b88" },
    "SH-1010": { name: "Abdul Wassey", hash: "fc8f5df94d314d65d8e36392dcd641809dcc2df82937e826228dc982da4a4ea4" },
    "SH-1011": { name: "Rehan Janjua", hash: "287a49cccc81b8b6cf50f204544f810ce7881ce23c3c9d3ffe65e2c2f594478a" },
    "SH-1012": { name: "Ali Ahmad", hash: "f2f634fa6a1fe10c403a0c7ebf610f7c2e5225fd7584f69e44db8d2880cd67a1" },
    "SH-1013": { name: "Sayeda Ayesha", hash: "bc1055a9fea42fbe0548e74889bc04f9f40fdede2d23b11e9c8eb498f8281188" },
    "SH-1014": { name: "Abdulah Ejaz", hash: "06d295005d6c4040fd9144c7e4540b505f4e891ab227778e4006abd48e7aa51d" },
    "SH-1015": { name: "Minahil Sareen", hash: "2ca71fbb206ea71173e561a92f34cffb3d6b501819bd52583488730a3c777d72" },
    "SH-1016": { name: "M.Talha", hash: "8f78b246b8276357ac09e9bf32969dd21073dd499d6a6408591ed4784025500e" },
    "SH-1017": { name: "Saad Abdullah", hash: "9e3ea6b7dff127649340eda7198670f401cedec961269dfa2c58d90de95f2fea" },
    "SH-1018": { name: "Sahil Khan", hash: "742b28aa63147281f482be854f983678e5f9dde39cd5e6c7c55128a175255b2a" },
    "SH-1019": { name: "Abdullah Dawood", hash: "5aff78c3b543dd9da90b99903a3c5e32158ed27e6d9484988c74b1447cf8c607" },
    "SH-1020": { name: "Ali Ahad", hash: "d8b0726f3af603a316c895e4b3218664b2418ee0f56126f1c92ad6822ab1e753" },
    "SH-1021": { name: "Aaliyan Ahmad", hash: "26c75f3bb1552c87f462a2a42028d54a892250e9e8126c0087cb807e15a113bb" },
    "SH-1022": { name: "Masab Javed", hash: "135f1655475ac9dd751e70ae9dea5b010e27183ec151ddca1831ba98071518f9" },
    "SH-1023": { name: "Umer Islam", hash: "ac15f2bcae938343124a6ef50d6bafe65ac73fc5be3e2ff8510baf6591a88f55" },
    "SH-1024": { name: "M.Sabat", hash: "345d8c47b444f6cbed4ac00fe4bec65f2f18324f78f213527dc6e2fc4a342cab" },
    "SH-1025": { name: "Ahmad Ali", hash: "b252e8b04e7cdec9a45dee59e75ade84e5812291901a8be51f841297b35d7f28" },
    "SH-1026": { name: "Tahamyum Mukarram", hash: "b2e55ccbaf03cfca91ebcf82a0b375ffcf2c4d4db7ca01cca27e111bee8bee67" },
    "SH-1027": { name: "Saim Ali Zia", hash: "b58f73d14dfc7a22f7003924a31209c2467c005bf09130337061bb50465dbe9d" },
    "SH-1028": { name: "Mudassar Muneer", hash: "c678acd3acc67ed8c593e4ff6ec9cfa1ee644089caa669b7ab43e738c01f3306" },
    "SH-1029": { name: "M.Haseeb", hash: "2923fa3e46d2646add8f7fc14e121e5f1489fd683edc27b081737da4e1d2508c" },
    "SH-1030": { name: "M.Farasatullah", hash: "1bf5915bef595a3a88387ff51f7839eca57d29c3ccc94420bc32085fa893fea7" },
    "SH-1031": { name: "Sayed Najaf", hash: "481f343f85963be1026e3d901bf0a57a6e43dd979fc6892c6f99ee91d507b363" },
    "SH-1032": { name: "Adam Afridi", hash: "3ea4c381b5bf81251ee818102cc4198c586c0dc0fa7a134239f377bccecc1624" },
    "SH-1033": { name: "Huzaifa Sajjad", hash: "eafc87f8c97882ba3b2cdf4edf0cb964d2cc34f2c1304608b2ba4c60ca0ecafc" },
    "SH-1034": { name: "Irtiza Husnain", hash: "a3175fb9b544c58c56ff0978992355e3b006daa18f6495062562d167feeafc76" },
    "SH-1035": { name: "Khushnood Fatima", hash: "2119698af0091cc3baa2fa38668b84f9742bc0a715b8d58338a4374a909fed7c" },
    "SH-1036": { name: "M.Ahsan", hash: "be246128c931edc790a1a4fc3c351e5f6097aeb682374d5a33446323670f0be7" },
    "SH-1037": { name: "M.Saim", hash: "4ceb99bf1df02f57e42820061d69150136995192c10e225ac884af8e78f45a9e" },
    "SH-1038": { name: "Bisma Usman", hash: "d30f90a0142a85cf0eb22c077d901e6714338a46a0356ad2b7dee48bbac33609" },
    "SH-1039": { name: "Momin Khan", hash: "b5d91c5460b8a4e150329fd1f5e1a61761046637d862c899d6c9b4c0dda1c809" },
    "SH-1040": { name: "Areej Fatima", hash: "c7750b0835d853b6fa9a537a87cd94d1840f01b83aaadc89e8d052aede6a36ae" },
    "SH-1041": { name: "Arham Minhas", hash: "e91ae1d632d49a9892c62e21306b16a317d96a8e05cba1ee2ebbe7e1fd7fce56" },
    "SH-1042": { name: "Huzaifa Javed Sulehri", hash: "4b8dfa115089aea6a8f531871e2c35a5ea5c1e189240212f7d76f39b02676407" },
    "SH-1043": { name: "Adan Fatima", hash: "82fa432705acff0aead506bfa3392f185e08196e875aaa0fe51c656161944625" },
    "SH-1044": { name: "Ali Hamza", hash: "c73a3da5ec94d08111d490d9cde7766b503caf546e073f06d2824e76b84a437f" },
    "SH-1045": { name: "Sayeda Sarma", hash: "6afb15661b18e7a1e4a92d59ccef50abea641930212f3569669f8998fd81dcba" },
    "SH-1046": { name: "M.Usman", hash: "004150d85738f2b50756eb65d6c699719556a2eefdd7c2f8843b63c593514f3f" },
    "SH-1047": { name: "Student 47", hash: "0bab70eefa984b67a160369e400d528871a0233cbb80a17fc4c9116044962743" }
  });

  const SESSION_STORAGE_KEY = 'sh_user';

  /**
   * Attempts login with student ID and password.
   * Compares cryptographic hashes instead of plaintext passwords.
   */
  function login(studentId, password) {
    if (!studentId || !password) {
      return { success: false, message: 'Please enter both Student ID and password.' };
    }

    const cleanId = String(studentId).trim().toUpperCase();
    const cleanPw = String(password).trim();

    const studentRecord = ENROLLED_STUDENTS[cleanId];
    if (!studentRecord) {
      return { success: false, message: 'Invalid Student ID or password. Check credentials.' };
    }

    const computedHash = sha256(cleanPw + SALT);
    if (computedHash === studentRecord.hash) {
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, cleanId);
      } catch (e) {
        console.warn('LocalStorage unavailable for session storage');
      }
      return {
        success: true,
        user: {
          id: cleanId,
          name: studentRecord.name
        }
      };
    }

    return { success: false, message: 'Invalid Student ID or password. Check credentials.' };
  }

  function logout() {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {}
  }

  function getCurrentUser() {
    try {
      const id = localStorage.getItem(SESSION_STORAGE_KEY);
      if (id && ENROLLED_STUDENTS[id]) {
        return {
          id: id,
          name: ENROLLED_STUDENTS[id].name
        };
      }
    } catch (e) {}
    return null;
  }

  function isValidStudent(id) {
    return Boolean(id && ENROLLED_STUDENTS[id]);
  }

  function getStudentName(id) {
    return ENROLLED_STUDENTS[id] ? ENROLLED_STUDENTS[id].name : 'Student';
  }

  function getAllStudentIds() {
    return Object.keys(ENROLLED_STUDENTS);
  }

  function getAllStudents() {
    return Object.keys(ENROLLED_STUDENTS).map(function (id) {
      return {
        id: id,
        name: ENROLLED_STUDENTS[id].name
      };
    });
  }

  // Freeze public API to prevent runtime tampering via DevTools
  const Auth = Object.freeze({
    login,
    logout,
    getCurrentUser,
    isValidStudent,
    getStudentName,
    getAllStudentIds,
    getAllStudents
  });

  global.Auth = Auth;
})(window);

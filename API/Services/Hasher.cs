using System;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
    class Hasher
    {
        private readonly SHA512 hasher;

        public Hasher()
        {
            hasher = SHA512.Create();
        }

        public string GetHash(string str)
        {
            var hash = hasher.ComputeHash(Encoding.UTF8.GetBytes(str));
            return Convert.ToBase64String(hash);
        }
    }
}
using System.Collections.Generic;
using API.Context;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private DataContext data;
        public AccountController()
        {
            data = new DataContext();
        }

        [HttpPost("login")]
        public Account Login(Account account)
        {
            var hasher = new Hasher();
            var passwordHash = hasher.GetHash(account.PasswordHash);

            data.SetAccount(ref account, account.Email, passwordHash);

            return account;
        }


        [HttpPost("register")]
        public Account Register(Account account)
        {
            var hasher = new Hasher();
            var passwordHash = hasher.GetHash(account.PasswordHash);
            data.AddAccount(account, passwordHash);
            data.SetAccount(ref account, account.Email, passwordHash);
            return account;
        }

        [HttpPut]
        public Account UpdateAccount(Account account)
        {
            var hasher = new Hasher();
            var passwordHash = hasher.GetHash(account.PasswordHash);
            var newAccount = new Account
            {
                Id = account.Id,
                RoleName = account.RoleName,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Email = account.Email,
                PasswordHash = passwordHash
            };
            data.UpdateAccount(newAccount);
            return account;
        }
    }
}
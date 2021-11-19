using System;

namespace API.Models
{
    public class Account
    {
        public Account() { }

        public Guid Id { get; set; }
        public string RoleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
using System.Collections.Generic;
using API.Context;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private DataContext data;
        public UserController()
        {
            data = new DataContext();
        }

        [HttpPost("order")]
        public void Buy(string accountId, string productId)
        {
            var storeId = data.GetProductStores(productId)[0].Id;

            data.CreateOrder(accountId, productId, storeId.ToString());
        }

        [HttpGet("order")]
        public List<Order> GetOrders(string accountId)
        {
            return data.GetAccountOrders(accountId);
        }
    }
}
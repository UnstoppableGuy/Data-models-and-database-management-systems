using System;
using System.Collections.Generic;
using API.Context;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private DataContext data;
        public AdminController()
        {
            data = new DataContext();
        }

        [HttpGet("categories")]
        public List<Category> GetCategories()
        {
            return data.GetCategories();
        }

        [HttpPost("categories")]
        public void AddCategory(Category category)
        {
            data.AddCategory(category.Name);
        }

        [HttpPut("categories")]
        public void EditCategory(Category category)
        {
            data.UpdateCategory(category);
        }

        [HttpGet("products")]
        public List<Product> GetProduct()
        {
            return data.GetProducts();
        }

        [HttpGet("filteredProducts")]
        public List<Product> GetFilteredProduct(string category)
        {
            return data.GetFilteredProducts(category);
        }

        [HttpGet("productStores")]
        public List<Store> GetProductStore(string productid)
        {
            return data.GetProductStores(productid);
        }

        [HttpPost("products")]
        public string AddProduct(Product product, string store)
        {
            data.AddProduct(product, store);
            return store;
        }

        [HttpGet("productImages")]
        public List<Image> GetProductImages(string productId)
        {
            return data.GetProductImages(productId);
        }

        [HttpPost("productImages")]
        public void AddProductImages(Image image)
        {
            data.AddImage(image);
        }

        [HttpDelete("productImages")]
        public void DeleteProductImage(string id, string productId, string url)
        {
            data.DeleteImage(new Image { Id = new Guid(id), ProductId = new Guid(productId), Url = url });
        }

        [HttpPut("products")]
        public decimal EditProduct(Product product)
        {
            data.UpdateProduct(product);

            return product.Price;
        }

        [HttpDelete("products")]
        public string RemoveProduct(string id)
        {
            data.DeleteProduct(new Product { Id = new System.Guid(id) });

            return "fafa";
        }

        [HttpGet("stores")]
        public List<Store> GetStores()
        {
            return data.GetStores();
        }

        [HttpPost("stores")]
        public void AddStore(Store store)
        {
            data.AddStore(store);
        }

        [HttpPut("stores")]
        public void EditCategory(Store store)
        {
            data.UpdateStore(store);
        }

        [HttpGet("logs")]
        public List<Log> GetLogs()
        {
            return data.GetLogs();
        }
    }
}
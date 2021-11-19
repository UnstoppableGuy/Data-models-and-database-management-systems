using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using API.Extensions;
using API.Models;

namespace API.Context
{
    delegate void Logger(string info);

    class DataContext
    {
        private readonly string connectionString =
            "Data Source=SET_YOUR_DB;Initial Catalog=StoreDb;Integrated Security=True";

        private readonly SqlConnection connection;

        private event Logger Log;

        public DataContext()
        {
            connection = new SqlConnection(connectionString);
            Log += AddLog;
        }

        private List<T> ReadProcedure<T>(string procedureName, Dictionary<string, object> parameters) where T : new()
        {
            connection.Open();
            var command = new SqlCommand();
            command.SetParameters(connection, procedureName, parameters);
            var result = command.Read<T>();
            connection.Close();
            return result;
        }

        private void WriteProcedure(string procedureName, Dictionary<string, object> parameters)
        {
            connection.Open();
            var command = new SqlCommand();
            command.SetParameters(connection, procedureName, parameters);
            command.ExecuteNonQuery();
            connection.Close();
        }

        public void SetAccount(ref Account account, string email, string passwordHash)
        {
            var result = ReadProcedure<Account>("GetAccount", new Dictionary<string, object>
            {
                { "@Email", email },
                { "@PasswordHash", passwordHash }
            });

            account = result.Count == 0 ? null : result[0];
        }

        public void AddAccount(Account user, string passwordHash)
        {
            WriteProcedure("AddAccount", new Dictionary<string, object>
            {
                { "@FirstName", user.FirstName },
                { "@LastName", user.LastName },
                { "@Email", user.Email },
                { "@PasswordHash", passwordHash }
            });
            Log($"User firstname: {user.FirstName} email: {user.Email} registered");
        }

        public void UpdateAccount(Account account)
        {
            WriteProcedure("UpdateAccount", new Dictionary<string, object>
            {
                { "@AccountId", account.Id },
                { "@FirstName", account.FirstName },
                { "@LastName", account.LastName },
                { "@Email", account.Email },
                { "@PasswordHash", account.PasswordHash }
            });
            Log($"Account id: {account.Id} updated");
        }
        /////////////////////////////////////////////////////////////////////////////////////

        public List<Category> GetCategories() => ReadProcedure<Category>("GetCategories", null);

        public void AddCategory(string categoryName)
        {
            WriteProcedure("AddCategory", new Dictionary<string, object>
            {
                { "@Name", categoryName}
            });
            Log($"Category: {categoryName} added");
        }

        public void UpdateCategory(Category category)
        {
            WriteProcedure("UpdateCategory", new Dictionary<string, object>
            {
                { "@CategoryId", category.Id },
                { "@CategoryName", category.Name }
            });
            Log($"Category: {category.Name} updated");
        }

        ///////////////////////////////////////////////////////////////////////////////////////

        public List<Product> GetProducts() => ReadProcedure<Product>("GetProducts", null);

        public List<Product> GetFilteredProducts(string category)
        {
            return ReadProcedure<Product>("GetProductsByCategory", new Dictionary<string, object>
            {
                { "@CategoryName", category}
            });
        }

        public void AddProduct(Product product, string store)
        {
            WriteProcedure("AddProduct", new Dictionary<string, object>
                {
                    { "@CategoryName", product.CategoryName },
                    { "@StoreName", store },
                    { "@Name", product.Name },
                    { "@Description", product.Description },
                    { "@Price", product.Price }
                });
            Log($"Product name: {product.Name} store: {store} category: {product.CategoryName} added");
        }

        public void UpdateProduct(Product product)
        {
            WriteProcedure("UpdateProduct", new Dictionary<string, object>
            {
                { "@ProductId", product.Id },
                { "@ProductName", product.Name },
                { "@ProductDescription", product.Description },
                { "@ProductPrice", product.Price }
            });
            Log($"Product id: {product.Id} updated");
        }

        public void DeleteProduct(Product product)
        {
            WriteProcedure("DeleteProduct", new Dictionary<string, object> { { "@ProductId", product.Id } });
            Log($"Product id: {product.Id} deleted");
        }

        public List<Store> GetProductStores(string productid)
        {
            return ReadProcedure<Store>("GetProductStores", new Dictionary<string, object>
            {
                { "@ProductId", productid }
            });
        }

        /////////////////////////////////////////////////////////////////////////

        public List<Order> GetAccountOrders(string accountId)
        {
            return ReadProcedure<Order>("GetAccountOrders", new Dictionary<string, object>
            {
                { "@AccountId", accountId }
            });
        }

        public void CreateOrder(string accountId, string productId, string storeId)
        {
            WriteProcedure("AddOrder", new Dictionary<string, object>
            {
                { "@AccountId", accountId},
                { "@ProductId", productId },
                { "@StoreId", storeId },
                { "@Date", DateTime.Now }
            });
            Log($"User id: {accountId} bought Product id: {productId} from Store id: {storeId}");
        }


        //////////////////////////////////////////////////////////////////////////
        public List<Store> GetStores() => ReadProcedure<Store>("GetStores", null);


        public void AddStore(Store store)
        {
            WriteProcedure("AddStore", new Dictionary<string, object>
                {
                    { "@Name", store.Name },
                    { "@Address", store.Address }
                });
            Log($"Store name: {store.Name} address: {store.Address} added");
        }

        public void UpdateStore(Store store)
        {
            WriteProcedure("UpdateStore", new Dictionary<string, object>
                {
                    { "@StoreId", store.Id },
                    { "@StoreName", store.Name },
                    { "@Address", store.Address }
                });
            Log($"Store id:{store.Id} updated");
        }
        //////////////////////////////////////////////////////

        public List<Image> GetProductImages(string productId)
        {
            return ReadProcedure<Image>("GetProductImages", new Dictionary<string, object>
            {
                { "@ProductId", productId }
            });
        }

        public void AddImage(Image image)
        {
            WriteProcedure("AddImage", new Dictionary<string, object>
            {
                { "@ProductId", image.ProductId },
                { "@Url", image.Url }
            });
            Log($"Image url: {image.Url} added to Product id: {image.ProductId}");
        }

        public void DeleteImage(Image image)
        {
            WriteProcedure("DeleteImage", new Dictionary<string, object>
            {
                { "@ImageId", image.Id }
            });
            Log($"Image id: {image.Id} deleted");
        }

        //////////////////////////////////////////////////////////////
        public List<Log> GetLogs() => ReadProcedure<Log>("GetLogs", null);

        public void AddLog(string info)
        {
            WriteProcedure("AddLog", new Dictionary<string, object>
            {
                { "@Info", info },
                { "@Date", DateTime.Now }
            });
        }
    }
}
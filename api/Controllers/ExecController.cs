using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json; // נוסף כדי לטפל בפרמטרים
namespace RealEstateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExecController : ControllerBase
    {
        private readonly string _connString;

        public ExecController(IConfiguration config)
        {
            // שליפת מחרוזת החיבור מהגדרות הפרויקט
            _connString = config.GetConnectionString("DefaultConnection");
        }

        [HttpPost]
        public async Task<IActionResult> ExecuteProcedure([FromBody] RequestModel request)
        {
            try
            {
                using var connection = new SqlConnection(_connString);

                // יצירת אובייקט פרמטרים מיוחד של Dapper כדי למנוע שגיאות SQL
                var dynamicParams = new DynamicParameters();

                if (request.Params != null)
                {
                    // המרת ה-JSON שנשלח מהאתר למבנה ש-SQL מבין
                    var jsonElement = (JsonElement)request.Params;
                    foreach (var property in jsonElement.EnumerateObject())
                    {
                        // הוספת כל פרמטר לרשימת הפרמטרים של הפרוצדורה
                        dynamicParams.Add(property.Name, property.Value.ToString());
                    }
                }

                // הרצת הפרוצדורה ושליפת הנתונים
                var result = await connection.QueryAsync(
                    request.SpName,
                    dynamicParams,
                    commandType: CommandType.StoredProcedure
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class RequestModel
    {
        public string SpName { get; set; }
 
        public object Params { get; set; }
    }
}

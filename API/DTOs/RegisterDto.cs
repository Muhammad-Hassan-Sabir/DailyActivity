using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [RegularExpression(@"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",ErrorMessage ="Password must be complex")]
        public string Password { get; set; }
        public string UserName { get; set; }

    }
}

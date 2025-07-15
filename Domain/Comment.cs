using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }

        public Activity Activity { get; set; }  // Navigation property

        public AppUser User { get; set; }  // Navigation to user

        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Default to current time
    }
}

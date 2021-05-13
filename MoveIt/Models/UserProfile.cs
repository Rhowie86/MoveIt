using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace MoveIt.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        
        [MaxLength(50)]
        public string FirstName { get; set; }

        
        [MaxLength(50)]
        public string LastName { get; set; }

       
        [MaxLength(50)]
        public string DisplayName { get; set; }

        
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
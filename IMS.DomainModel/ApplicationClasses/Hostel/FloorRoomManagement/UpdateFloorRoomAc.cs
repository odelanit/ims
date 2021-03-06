﻿using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.FloorRoomManagement
{
    public class UpdateFloorRoomAc
    {
        public int Id { get; set; }

        [Required]
        public int FloorNo { get; set; }

        [Required]
        public int BlockId { get; set; }

        [Required]
        public string RoomNo { get; set; }

        [Required]
        public int RoomType { get; set; }

        [Required]
        public int BedAmount { get; set; }

        public bool Status { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesWebsite.Application.DTO
{
    public class AddClassRequest
    {
        public string Level { get; set; }
        public Guid TeacherId { get; set; }
    }
}

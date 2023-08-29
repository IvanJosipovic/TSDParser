using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;

namespace TSDParser.Interfaces
{
    public interface Node
    {
        SyntaxKind Kind { get; }
    }
}

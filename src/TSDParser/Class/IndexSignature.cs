using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class IndexSignature : Node
    {
        public SyntaxKind Kind => SyntaxKind.IndexSignature;

        public List<Parameter> Parameters { get; set; }

        public Node Type { get; set; }
    }
}
